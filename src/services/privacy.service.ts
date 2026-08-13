import { prisma } from "../config/db";

export class PrivacyService {
  async createPrivacySettings(parentProfileId: string) {
    const existing = await prisma.privacySettings.findUnique({
      where: { parentProfileId },
    });
    if (existing) {
      return existing;
    }
    return prisma.privacySettings.create({
      data: {
        parentProfileId,
        isNeedsPublic: true,
        isChildStagePublic: true,
        isGroupsPublic: true,
      },
    });
  }

  async updatePrivacySettings(parentProfileId: string, data: any) {
    return prisma.privacySettings.upsert({
      where: { parentProfileId },
      update: data,
      create: {
        parentProfileId,
        isNeedsPublic: data.isNeedsPublic ?? true,
        isChildStagePublic: data.isChildStagePublic ?? true,
        isGroupsPublic: data.isGroupsPublic ?? true,
      }
    });
  }
  async getPrivacySettings(parentProfileId: string) {
    return prisma.privacySettings.findUnique({
      where: { parentProfileId },
    });
  }
}
