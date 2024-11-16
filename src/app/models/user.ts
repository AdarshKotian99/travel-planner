import { Activity } from "./activity";
import { Feedback } from "./feedback";

export interface user {
    id : string;
    userEmail : string;
    pass : string;
    activities : Activity[];
    feedbacks : Feedback[];
}