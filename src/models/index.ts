export interface ParentProfile {
  id: string;
  firstName: string;
  city: string;
  state: string;
  familyNeeds: string[];
  isPrivate: boolean;
}

export interface CommunityGroup {
  id: string;
  name: string;
  location: string;
  website?: string;
  focus?: string;
}
