import { prisma } from "../config/db";

export class ProfileService {
  async getALLProfiles() {
    return prisma.parentProfile.findMany();
  }

  async getProfileById(id: string) {
    return prisma.parentProfile.findUnique({ where: { id },
    include: {
      privacy: true,
      needs: true,
      stages: true,
      groups: true
    }
    });
  }

  async createProfile(data: any) {
    const { isNeedsPublic, isChildStagePublic, isGroupsPublic, ...profileData } = data;

    return prisma.parentProfile.create({
      data: {
        ...profileData,
        privacy: {
          create: {
            // Set default values for privacy settings if not provided
            isNeedsPublic: isNeedsPublic ?? true,
            isChildStagePublic: isChildStagePublic ?? true,
            isGroupsPublic: isGroupsPublic ?? true,
          },
        },
      },
      include: { privacy: true, needs: true, stages: true, groups: true },
    });
  }

  async updateProfile(id: string, data: any) {
    return prisma.parentProfile.update({ where: { id }, data });
  }

  async deleteProfile(id: string) {
    return prisma.$transaction(async (tx) => {
      // Delete related records in other tables first to avoid foreign key constraint errors
      await tx.privacySettings.deleteMany({where: { parentProfileId: id} });
      await tx.parentGroupMembership.deleteMany({where: { parentProfileId: id} });
      await tx.parentProfileChildStage.deleteMany({where: { parentProfileId: id} });
      await tx.parentProfileNeed.deleteMany({where: { parentProfileId: id} });

      // Now delete the parent profile
      const deleted = await tx.parentProfile.delete({ where: { id } });
      if (!deleted) throw new Error("Profile not found");
      return deleted;
    });
  }
}
