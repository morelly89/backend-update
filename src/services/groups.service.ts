import { prisma } from "../config/db";

export class GroupService {
    async getAllGroups() {
        return prisma.communityGroup.findMany();
    }

    async getGroupById(id: string) {
        return prisma.communityGroup.findUnique({ where: { id } });

    }
  async createGroup(data: any) {
    return prisma.communityGroup.create({ data });
  }

  async updateGroup(id: string, data: any) {
    return prisma.communityGroup.update({ where: { id }, data });
  }

  async deleteGroup(id: string) {
    return prisma.communityGroup.delete({ where: { id } });
  }

}