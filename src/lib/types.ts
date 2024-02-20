export type UserProps = {
  id: string;
  name: string;
  email: string;
  image?: string;
  createdAt: Date;
};

export type EventProps = {
  id: string;
  name: string;
  description?: string;
  isShowGroomNameFirst: boolean;
  groomName: string;
  groomInstagram?: string;
  groomPhoto?: string;
  isShowGroomParentsName: boolean;
  groomParentsName?: string;
  brideName: string;
  brideInstagram?: string;
  bridePhoto?: string;
  isShowBrideParentsName: boolean;
  brideParentsName?: string;
  published: boolean;
  url: string;
  date: Date;
  user: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: Date;
  updatedAt: Date;
};
