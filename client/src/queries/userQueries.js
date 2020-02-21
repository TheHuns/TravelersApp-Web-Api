import { gql } from "apollo-boost";

export const loginMutation = gql`
  mutation($userSub: String, $name: String) {
    login(userInfo: { userSub: $userSub, name: $name }) {
      name
      _id
      token
    }
  }
`;
