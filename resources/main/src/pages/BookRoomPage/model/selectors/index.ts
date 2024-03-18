import { StateSchema } from "@/app/providers/StoreProvider";

export const getPageBookFormData = (state: StateSchema) => state.pageBookForm.data;
