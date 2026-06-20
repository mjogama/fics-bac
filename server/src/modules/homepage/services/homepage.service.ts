import Homepage from "../models/Homepage";

export const retrieveData = async () => {
  return await Homepage.find().select("_id imageUrl title description");
};

export const updateHomepage = async (
  id: string,
  data: Partial<{
    imageUrl: string;
    title: string;
    description: string;
  }>,
) => {
  return await Homepage.updateOne({ _id: id }, { $set: data });
};
