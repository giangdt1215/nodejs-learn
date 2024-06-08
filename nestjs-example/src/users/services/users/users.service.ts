import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Category } from 'src/typeorm/Category';
import { User as UserEntity } from 'src/typeorm/User';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { SerializedUser, User } from 'src/users/types';
import { encodePassword } from 'src/utils/bcrypt';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  private users: User[] = [];

  async getUsers() {
    // return this.users.map((user) => plainToClass(SerializedUser, user));
    // return this.users.map((user) => new SerializedUser(user));
    const users = await this.userRepository.find();
    return users.map((user) => new SerializedUser(user));
  }

  getUserByUsername(username: string) {
    return this.users.find((user) => user.username === username);
  }

  getUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }

  createUser(createUserDto: CreateUserDto) {
    const hashPass = encodePassword(createUserDto.password);
    const emailAddress = createUserDto.email;
    const newUser = this.userRepository.create({
      ...createUserDto,
      emailAddress,
      password: hashPass,
    });
    return this.userRepository.save(newUser);
  }

  findUserByUsername(username: string) {
    return this.userRepository.findOne({ where: { username: username } });
  }

  findUserById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async createHier() {
    const a1 = new Category();
    a1.name = 'a1';
    await this.entityManager.save(a1);

    const a11 = new Category();
    a11.name = 'a11';
    a11.parent = a1;
    await this.entityManager.save(a11);

    const a12 = new Category();
    a12.name = 'a12';
    a12.parent = a1;
    await this.entityManager.save(a12);

    const a111 = new Category();
    a111.name = 'a111';
    a111.parent = a11;
    await this.entityManager.save(a111);

    const a112 = new Category();
    a112.name = 'a112';
    a112.parent = a11;
    await this.entityManager.save(a112);

    const b1 = new Category();
    b1.name = 'b1';
    await this.entityManager.save(b1);

    const b11 = new Category();
    b11.name = 'b11';
    b11.parent = b1;
    await this.entityManager.save(b11);
  }

  

  async testHier() {
    // return await this.entityManager.getTreeRepository(Category).findTrees();
    // return await this.fetchRecursive(1);
    const category4 = await this.categoryRepository.findOne({
      where: {
        id: 4
      }
    })

    const category5 = await this.categoryRepository.findOne({
      where: {
        id: 5
      }
    })

    // return await this.entityManager.getTreeRepository(Category).findDescendantsTree(category);
    const tree1 = await this.entityManager.getTreeRepository(Category).findAncestors(category4, {
      relations: ['parent']
    });
    const result1 = tree1.reverse().reduce((res, key) => ({
      id: key.id,
      name: key.name,
      children: Object.keys(res).length > 0 ? [res] : []}), {});

      const tree2 = await this.entityManager.getTreeRepository(Category).findAncestors(category5, {
        relations: ['parent']
      });
      const result2 = tree2.reverse().reduce((res, key) => ({
        id: key.id,
        name: key.name,
        children: Object.keys(res).length > 0 ? [res] : []}), {});
  
    // const arrayToTree = require('array-to-tree');
    // return arrayToTree(tree1, {
    //   parentProperty: 'parentId'
    // })
    return [result1, result2]
    // return this.convertArrayToTree(tree1) as Category
    // const testTree =  await this.entityManager.getTreeRepository(Category).findAncestorsTree(category);
    // return this.reverseTree(testTree as CategoryTest) as Category;
  }

  mergeTrees(tree1, tree2) {
    if (!tree1 || !tree2) {
      return tree1 || tree2;
    }
  
    const mergedNode = {
      id: tree1.id,
      name: tree1.name,
      children: [],
    };
  
    for (let i = 0; i < Math.max(tree1.children.length, tree2.children.length); i++) {
      mergedNode.children.push(this.mergeTrees(tree1.children[i], tree2.children[i]));
    }
  
    return mergedNode;
  }
  
  // convertArrayToTree (nodes: Category[]) {
  //   const nodeMap: { [key: string]: CategoryNode } = {};
  
  //   // Create a mapping of nodes by their ID
  //   nodes.forEach((nodeData) => {
  //     const node: CategoryNode = {
  //       id: nodeData.id,
  //       name: nodeData.name,
  //       description: nodeData.description,
  //       children: [],
  //     };
  //     nodeMap[node.id] = node;
  //   });
  
  //   // Connect nodes to their parent
  //   nodes.forEach((nodeData) => {
  //     const node = nodeMap[nodeData.id];
  //     if (nodeData.parent) {
  //       node.parent = nodeMap[nodeData.parent.id];
  //       node.parent.children.push(node);
  //     }
  //   });
  
  //   // Find and return the root node(s)
  //   const rootNodes: CategoryNode[] = nodes.filter((nodeData) => !nodeData.parent).map((nodeData) => nodeMap[nodeData.id]);
  
  //   if (rootNodes.length === 1) {
  //     return rootNodes[0];
  //   } else {
  //     // If there are multiple root nodes, you might want to handle this case based on your requirements
  //     // For simplicity, this example returns an object with multiple roots
  //     return { roots: rootNodes };
  //   }
  // };

  async fetchRecursive(cateId: number): Promise<Category> {
    const parentCategory = await this.categoryRepository.findOne({
      where: { id: cateId },
    });
    console.log(parentCategory);
    const children = await this.categoryRepository.find({
      where: {
        parent: {
          id: parentCategory.id,
        },
      },
    });
    const childPromises = children.map((child) =>
      this.fetchRecursive(child.id),
    );
    const nestedChildren = await Promise.all(childPromises);
    parentCategory.children = nestedChildren;
    return parentCategory;
  }
}

interface CategoryTest {
  id: number;
  name: string;
  description: string | null;
  parent?: CategoryTest;
}

interface CategoryNode {
  id: number;
  name: string;
  description: string | null;
  children?: CategoryNode[];
}
