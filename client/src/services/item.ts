import type { AxiosResponse } from "axios";
import api from "./api";
export const ProductService = {
  async getItems(parameter: any) {
    return await api({ requiresAuth: true })
      .get(`${import.meta.env.VITE_CORE}/master/item`, {
        params: {
          lazyEvent: JSON.stringify(parameter),
        },
      })
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((e) => {
        throw e;
      });
  },
};
