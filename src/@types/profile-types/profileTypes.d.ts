declare module "profile-types" {
  export type UserProfileProps = {
    user?: {
      username: string;
      rating: number;
      win: number;
      lose: number;
      relation: "myself" | "friend" | "others";
      gameHistory: [
        {
          uniqueId: number;
          red: string;
          blue: string;
          redScore: number;
          blueScore: number;
          winner: string;
          type: string;
        },
      ];
    };
  };

  export type QuerySet = [QueryKey, string | undefined][];
}
