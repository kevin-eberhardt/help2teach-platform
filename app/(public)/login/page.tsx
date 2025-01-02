import { Params } from "next/dist/server/request/params";
import LoginForm from "./form";
import { SearchParams } from "next/dist/server/request/search-params";

export default async function LoginPage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;
  console.log(searchParams.error);
  return (
    <div className="w-full max-w-sm mx-auto">
      <LoginForm error={decodeURI(searchParams.error as string)} />
    </div>
  );
}
