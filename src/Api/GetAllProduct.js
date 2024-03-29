import axios from "axios";

const getAllProduct = async (page = 1, limit = 4, filter = undefined, filterID = undefined) => {
  const url = filter ? `https://clean-bat-cape.cyclic.app/api/products?${filter}=${filterID}` : `https://clean-bat-cape.cyclic.app/api/products`;
  try {
    const response = await axios.get(url, {
      params: {
        fields: '-rating,-createdAt,-updatedAt',
        sort: 'price',
        limit: limit,
        page: page,
      },
    });

    if (response.status === 200) {
      const products = response;


      return products;
    } else {
      console.error("Error fetching data:", response.statusText);
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};

export default getAllProduct;
