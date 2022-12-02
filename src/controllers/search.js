const axios = require("axios");
const { Namespace } = require("socket.io");

exports.listAll = async (req, res) => {
  try {
    const textToShearing = req.params.search;
    const itemsRequest = await axios(
      `https://api.mercadolibre.com/sites/MLA/search?q=${textToShearing}&limit=20`
    );

    const allItem = await itemsRequest?.data;

    const allCategories = await [];
    const nuevaFuncion = async () => {
      allItem.available_filters.reduce((acumulador, valorActual) => {
        valorActual.id === "category"
          ? valorActual.values.reduce((acum2, valorAct2) =>
              allCategories.push(valorAct2)
            )
          : [];
      }, []);
    };
    const getNameCategory = (category_id) => {
      let nameCat = allCategories.find((it) => it.id === category_id);
      let item = nameCat?.name != null ? nameCat.name : "no_category";
      return [item];
    };

    let dd = await nuevaFuncion();
    //console.log(allCategories);

    const items = allItem.results.map((item) => ({
      author: {
        name: "config.firstName",
        lastname: "config.lastname",
      },
      categories: getNameCategory(item.category_id),
      items: [
        {
          id: item.id,
          title: item.title,
          price: {
            currency: item.currency_id,
            amount: Math.trunc(item.price),
            decimals: item.price - Math.trunc(item.price),
          },
          picture: item.thumbnail,
          condition: item.condition,
          free_shipping: item.shipping.free_shipping,
          address: item.address.state_name,
        },
      ],
    }));

    res.json(items);
    //res.json(await items);
    //res.json(await itemsRequest.data.results);
  } catch (error) {
    console.log(error);
    res.status(400).send("Search failed");
  }
};
