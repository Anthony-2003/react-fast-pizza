import { useSelector } from "react-redux";
import { RootState } from "../../types/MenuItem";

export default function UserName() {
  const userName = useSelector((state: RootState) => state.user.username);

  if (!userName) return null;

  return <p className="hidden text-sm font-semibold md:block">{userName}</p>;
}
