import { Activity } from "./activity";

export interface user {
    id : string;
    userEmail : string;
    pass : string;
    activities : Activity[];
}