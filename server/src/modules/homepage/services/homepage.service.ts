import Homepage from "../models/Homepage";

export const retrieveHomepageData = async () => {
  return await Homepage.find().select("_id imageUrl title description");
};

export const updateHomepageData = async (
  id: string,
  data: Partial<{
    imageUrl: string;
    title: string;
    description: string;
  }>,
) => {
  return await Homepage.updateOne({ _id: id }, { $set: data });
};
