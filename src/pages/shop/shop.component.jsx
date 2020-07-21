import React, { useState } from "react";
import { SHOP_DATA } from "./shop.data";
import { CollectionPreview } from "../../components/collection-preview/collection-preview.component";

export const ShopPage = () => {
  const [state, setState] = useState({ collections: SHOP_DATA });

  return (
    <div>
      {state.collections.map((collection) => (
        <CollectionPreview title={collection.title} items={collection.items} />
      ))}
    </div>
  );
};
