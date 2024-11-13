import { Activity } from "./activity";

export interface user {
    userEmail : string;
    pass : string;
    activities : Activity[];
}