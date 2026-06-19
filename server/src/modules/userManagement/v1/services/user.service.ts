import User from "@modules/auth/models/User";

const limit = 4;

export const retrieveUsers = async (page: number) => {
  const skip = (page - 1) * limit;

  const [users, totalUsers] = await Promise.all([User.find().select("_id name email role").sort({ createdAt: -1 }).skip(skip).limit(limit), User.countDocuments()]);
  const totalPages = Math.ceil(totalUsers / limit);

  return {
    users,
    pagination: {
      page,
      limit,
      totalUsers,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
};

export const retrieveUserById = async (id: string) => {
  return await User.findOne({ _id: id }).select("_id name email role");
};

export const deleteUserAccountById = async (id: string) => {
  return await User.deleteOne({ _id: id });
};
