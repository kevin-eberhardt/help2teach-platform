import { getUser } from "@/lib/supabase/queries";

export default async function UserAvatar() {
  const user = await getUser();
  console.log(user);
  if (user) {
    return <div>{user.email}</div>;
  } else {
    return <div>no user</div>;
  }
}
