import { memo } from "react";

const User = ({ user }: { user: any }) => {
  return (
    <tr className="table__row user">
      <td className={`table__cell text-sm font-medium capitalize text-accent`}>
        {user.firstName}
      </td>
      <td className={`table__cell text-sm font-medium capitalize text-accent`}>
        {user.lastName}
      </td>
      <td className={`table__cell text-sm font-medium text-accent`}>
        {user.email}
      </td>
      <td className={`table__cell text-sm font-medium text-accent`}>
        {user.active ? "Activated" : "Non Activated"}
      </td>
      <td className={`table__cell text-sm font-medium text-accent`}>
        {user.role}
      </td>
      <td className={`table__cell text-sm font-medium text-accent`}>
        {user.createdAt.toISOString().substring(0, 10)}
      </td>
      <td className={`table__cell text-sm font-medium text-accent`}>
        {user.updatedAt?.toISOString().substring(0, 10)}
      </td>
    </tr>
  );
};

const memoizedUser = memo(User);

export default memoizedUser;
