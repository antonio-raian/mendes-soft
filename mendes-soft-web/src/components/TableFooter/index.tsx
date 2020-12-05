import { MetaListpaginated } from "@/interfaces";
import React from "react";
import { BiArrowBack, BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { Buttons, Container, Page, SelectComponent } from "./styles";

interface FooterProps {
  meta: MetaListpaginated;
  actionNext?: () => void;
  actionBack?: () => void;
}

const unit = [{}];

const TableFooter: React.FC<FooterProps> = ({
  meta,
  actionNext,
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
              <b>{meta.current_page}</b>/{meta.last_page}
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
