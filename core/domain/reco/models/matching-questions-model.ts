import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type MatchingQuestionResponse = components["schemas"]["MatchingQuestionResponse"];

export interface MatchingQuestionsInterface extends MatchingQuestionResponse {}

export class MatchingQuestions implements MatchingQuestionsInterface {
  id!: MatchingQuestionResponse["id"];
  body!: MatchingQuestionResponse["body"];
  description!: MatchingQuestionResponse["description"];
  multipleChoice!: MatchingQuestionResponse["multipleChoice"];
  answers!: MatchingQuestionResponse["answers"];

  constructor(props: MatchingQuestionResponse) {
    Object.assign(this, props);
  }
}
