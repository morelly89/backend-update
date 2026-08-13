-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParentProfile" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT,
    "instagram" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ParentProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrivacySettings" (
    "id" TEXT NOT NULL,
    "parentProfileId" TEXT NOT NULL,
    "isNeedsPublic" BOOLEAN NOT NULL DEFAULT true,
    "isChildStagePublic" BOOLEAN NOT NULL DEFAULT true,
    "isGroupsPublic" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "PrivacySettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FamilyNeed" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "FamilyNeed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParentProfileNeed" (
    "parentProfileId" TEXT NOT NULL,
    "familyNeedId" TEXT NOT NULL,

    CONSTRAINT "ParentProfileNeed_pkey" PRIMARY KEY ("parentProfileId","familyNeedId")
);

-- CreateTable
CREATE TABLE "ChildStage" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,

    CONSTRAINT "ChildStage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParentProfileChildStage" (
    "parentProfileId" TEXT NOT NULL,
    "childStageId" TEXT NOT NULL,

    CONSTRAINT "ParentProfileChildStage_pkey" PRIMARY KEY ("parentProfileId","childStageId")
);

-- CreateTable
CREATE TABLE "CommunityGroup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommunityGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParentGroupMembership" (
    "parentProfileId" TEXT NOT NULL,
    "communityGroupId" TEXT NOT NULL,

    CONSTRAINT "ParentGroupMembership_pkey" PRIMARY KEY ("parentProfileId","communityGroupId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PrivacySettings_parentProfileId_key" ON "PrivacySettings"("parentProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "FamilyNeed_code_key" ON "FamilyNeed"("code");

-- CreateIndex
CREATE UNIQUE INDEX "ChildStage_code_key" ON "ChildStage"("code");

-- AddForeignKey
ALTER TABLE "PrivacySettings" ADD CONSTRAINT "PrivacySettings_parentProfileId_fkey" FOREIGN KEY ("parentProfileId") REFERENCES "ParentProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParentProfileNeed" ADD CONSTRAINT "ParentProfileNeed_familyNeedId_fkey" FOREIGN KEY ("familyNeedId") REFERENCES "FamilyNeed"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParentProfileNeed" ADD CONSTRAINT "ParentProfileNeed_parentProfileId_fkey" FOREIGN KEY ("parentProfileId") REFERENCES "ParentProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParentProfileChildStage" ADD CONSTRAINT "ParentProfileChildStage_childStageId_fkey" FOREIGN KEY ("childStageId") REFERENCES "ChildStage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParentProfileChildStage" ADD CONSTRAINT "ParentProfileChildStage_parentProfileId_fkey" FOREIGN KEY ("parentProfileId") REFERENCES "ParentProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParentGroupMembership" ADD CONSTRAINT "ParentGroupMembership_communityGroupId_fkey" FOREIGN KEY ("communityGroupId") REFERENCES "CommunityGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParentGroupMembership" ADD CONSTRAINT "ParentGroupMembership_parentProfileId_fkey" FOREIGN KEY ("parentProfileId") REFERENCES "ParentProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
