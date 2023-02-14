import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "../api/fetcher";
import { Container } from "./style";

type Group = {
  id: string;
  name: string;
  members: Member[];
};

type Member = {
  id: string;
  name: string;
};

const Group = () => {
  const [group, setGroup] = useState<Group | null>(null);
  // const { data } = useSWR<Group | null>(
  //   group ? `/api/groups/${group.id}` : null,
  //   fetcher
  // );

  const data = {
    id: "1",
    name: "Group 1",
    members: [
      {
        id: "1",
        name: "Member 1",
      },
      {
        id: "2",
        name: "Member 2",
      },
    ],
  };

  return (
    <Container>
      <h1>Group</h1>
      <div>
        <button
          onClick={() => {
            setGroup(data);
          }}
        >
          Get Group
        </button>
      </div>
      {group && (
        <div>
          <h2>{group.name}</h2>
          <ul>
            {group.members.map((member) => (
              <li key={member.id}>{member.name}</li>
            ))}
          </ul>
        </div>
      )}
    </Container>
  );
};

export default Group;
