declare module "profile-types" {
  export type UserProfileProps = {
    user?: {
      username: string;
      rating: number;
      win: number;
      lose: number;
      relation: "myself" | "friend" | "others";
      achievement: string[];
      gameHistory: [
        {
          id: number;
          rule: "normal" | "rank" | "arcade";
          red: string;
          blue: string;
          redScore: number;
          blueScore: number;
          winner: string;
        },
      ];
    };
  };

  export type QuerySet = [QueryKey, string | undefined][];
}
