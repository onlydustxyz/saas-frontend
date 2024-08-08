import { Chart } from "@/app/test/_components/chart/chart";

import { Button } from "@/design-system/atoms/button/variants/button-default";

import { Translate } from "@/shared/translation/components/translate/translate";

export default function TestPage() {
  return (
    <div>
      <Translate i18nKey={"very.deep.trad"} ns={"test"} /> <Translate i18nKey={"test:very.deep.trad"} />
      <Button>test</Button>
      <Chart />
    </div>
  );
}
