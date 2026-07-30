import {
  openDB,
  type DBSchema,
  type IDBPDatabase,
} from "idb";

import type { FollowUpReminder } from "../types/followUp";


interface FollowUpDB extends DBSchema {
  reminders: {
    key: string;
    value: FollowUpReminder;

    indexes: {
      "by-employee": string;
      "by-follow-up-date": string;
      "by-status": string;
    };
  };
}


const DB_NAME = "sales-visit-reporting";
const DB_VERSION = 1;


let dbPromise: Promise<IDBPDatabase<FollowUpDB>> | null =
  null;


export function getFollowUpDB() {
  if (!dbPromise) {
    dbPromise = openDB<FollowUpDB>(
      DB_NAME,
      DB_VERSION,
      {
        upgrade(db) {
          const store = db.createObjectStore(
            "reminders",
            {
              keyPath: "id",
            }
          );

          store.createIndex(
            "by-employee",
            "employeeId"
          );

          store.createIndex(
            "by-follow-up-date",
            "followUpDate"
          );

          store.createIndex(
            "by-status",
            "status"
          );
        },
      }
    );
  }

  return dbPromise;
}