const axios = require("axios");
const AUTHOR_NAME = process.env.AUTHOR_NAME;
const AUTHOR_LAST_NAME = process.env.AUTHOR_LAST_NAME;

exports.listBox = async (req, res) => {
  try {
    const textToShearing = req.params.searching;
    const itemsRequest = await axios(
      `https://api.mercadolibre.com/sites/MLA/search?q=${textToShearing}&limit=4`
    );

    const allItem = await itemsRequest?.data;

    const getNameCategory = (category_id) => {
      let nameCat = allCategories.find((it) => it.id === category_id);
      let item = nameCat?.name != null ? nameCat.name : "no_category";
      return [item];
    };
    const getNameCategories = () => {
      const categories = [];
      allItem?.filters.find(
        (item) =>
          item.id === "category" &&
          item.values.map((item) =>
            item.path_from_root.map((itm) => categories.push(itm.name))
          )
      );
      return categories;
    };
    const author = {
      name: AUTHOR_NAME,
      lastname: AUTHOR_LAST_NAME,
    };
    const categories = getNameCategories();
    const items = allItem.results.map((item) => ({
      id: item.id,
      title: item.title,
      price: {
        currency: item.currency_id,
        amount: Math.trunc(item.price),
        decimals: Math.trunc(item.price),
      },
      picture: item.thumbnail,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
      address: item.address.state_name,
    }));

    const itemsBox = { author, categories, items };

    res.json(itemsBox);
  } catch (error) {
    console.log(error);
    res.status(400).send("Search failed");
  }
};

exports.listAll = async (req, res) => {
  try {
    const textToShearing = req.params.searching;
    const itemsRequest = await axios(
      `https://api.mercadolibre.com/sites/MLA/search?q=${textToShearing}`
    );

    const allItem = await itemsRequest?.data;

    const getNameCategory = (category_id) => {
      let nameCat = allCategories.find((it) => it.id === category_id);
      let item = nameCat?.name != null ? nameCat.name : "no_category";
      return [item];
    };
    const getNameCategories = () => {
      const categories = [];
      allItem?.filters.find(
        (item) =>
          item.id === "category" &&
          item.values.map((item) =>
            item.path_from_root.map((itm) => categories.push(itm.name))
          )
      );
      return categories;
    };
    const author = {
      name: AUTHOR_NAME,
      lastname: AUTHOR_LAST_NAME,
    };
    const categories = getNameCategories();
    const items = allItem.results.map((item) => ({
      id: item.id,
      title: item.title,
      price: {
        currency: item.currency_id,
        amount: Math.trunc(item.price),
        decimals: Math.trunc(item.price),
      },
      picture: item.thumbnail,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
      address: item.address.state_name,
    }));

    const itemsBox = { author, categories, items };

    res.json(itemsBox);
  } catch (error) {
    console.log(error);
    res.status(400).send("Search failed");
  }
};

exports.getItem = async (req, res) => {
  try {
    const productId = req.params.id;

    const itemsRequest = await axios(
      `https://api.mercadolibre.com/items/${productId}`
    );

    const itemDescriptionRequest = await axios(
      `https://api.mercadolibre.com/items/${productId}/description`
    );
    const itemDescription = itemDescriptionRequest.data;

    const itemData = await itemsRequest?.data;

    const items = {
      author: {
        name: AUTHOR_NAME,
        lastname: AUTHOR_LAST_NAME,
      },
      item: {
        id: itemData.id,
        title: itemData.title,
        price: {
          currency: itemData.currency_id,
          amount: Math.trunc(itemData.price),
          decimals: itemData.price - Math.trunc(itemData.price),
        },
      },

      picture: itemData.pictures
        .slice(0, 1)
        .map((value) => value.url)
        .toString(),
      condition: itemData.condition,
      free_shipping: itemData.shipping.free_shipping,
      sold_quantity: itemData.sold_quantity,
      description: itemDescription.plain_text,
    };
    res.json(items);
  } catch (error) {
    console.log(error);
  }
};
