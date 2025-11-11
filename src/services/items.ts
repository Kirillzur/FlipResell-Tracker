import type { Item } from "../Component/types";
import { db } from "../lib/firebase";
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  type Unsubscribe,
} from "firebase/firestore";

const itemsCol = collection(db, "items");

export function subscribeItems(cb: (items: Item[]) => void): Unsubscribe {
  const q = query(itemsCol, orderBy("date", "desc"));
  return onSnapshot(
    q,
    (snap) => {
      const items: Item[] = snap.docs.map((d) => {
        const data = d.data() as any;
        return {
          id: d.id,
          name: data.name,
          price: Number(data.price),
          sellPrice:
            data.sellPrice === null || data.sellPrice === undefined
              ? undefined
              : Number(data.sellPrice),
          date: data.date,
          sellDate:
            data.sellDate === null || data.sellDate === undefined
              ? undefined
              : String(data.sellDate),
        } satisfies Item;
      });
      cb(items);
    },
    (err) => {
      console.error("[Firestore] subscribeItems error", err);
      // Basic user feedback so it isn't silent
      alert(
        err?.message ||
          "Failed to subscribe to items. Check Firebase config and Firestore rules."
      );
    }
  );
}

export async function saveItem(item: Item): Promise<void> {
  const ref = doc(itemsCol, item.id);
  const body = {
    name: item.name,
    price: item.price,
    sellPrice: item.sellPrice ?? null,
    date: item.date,
    sellDate: item.sellDate ?? null,
  };
  await setDoc(ref, body, { merge: true });
}

export async function deleteItemById(id: string): Promise<void> {
  await deleteDoc(doc(itemsCol, id));
}
