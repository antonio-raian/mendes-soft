import { MetaListpaginated } from "@/interfaces";
import React from "react";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { Buttons, Container, Page } from "./styles";

interface FooterProps {
  meta: MetaListpaginated;
  actionNext?: () => void;
  goToAction: (value: number) => void;
  actionBack?: () => void;
}

const TableFooter: React.FC<FooterProps> = ({
  meta,
  actionNext,
  goToAction,
  actionBack,
  ...rest
}) => {
  return (
    <Container>
      <tr>
        <td></td>
        <td>
          <b>Total de Itens:</b> {meta.total}
        </td>
        <td></td>
        <td>
          <Buttons>
            <b>Páginas: </b>
            <BiSkipPrevious
              size={30}
              onClick={meta.previous_page_url ? actionBack : () => {}}
              color={meta.previous_page_url ? "#000000" : "#ddd"}
            />
            <Page>
              <input
                style={{ width: "15%" }}
                type="number"
                min={1}
                defaultValue={meta.current_page}
                onKeyPress={(e) => {
                  if (e.key == "Enter")
                    goToAction(Number(e.currentTarget.value));
                }}
              />
              /{meta.last_page}
            </Page>
            <BiSkipNext
              size={30}
              onClick={meta.next_page_url ? actionNext : () => {}}
              color={meta.next_page_url ? "#000000" : "#ddd"}
            />
          </Buttons>
        </td>
      </tr>
    </Container>
  );
};

export default TableFooter;
