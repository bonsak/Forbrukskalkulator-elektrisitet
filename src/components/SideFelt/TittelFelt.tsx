import styled from "styled-components";
import { COLORS, SIZES } from "@utils/constants";
import { useStroemForbrukStore } from "@stores/stroemForbrukStore";
import { useMittHusStore } from "@stores/mittHusStore";
import { useDagensPriserStore } from "@stores/dagensPriserStore";
import { beregnTotalKWh, beregnEksaktDagsPris } from "@utils/gridEngine";

const TittelFelt = () => {
  const { mittHus } = useMittHusStore();
  const { stroemForbruk } = useStroemForbrukStore();
  const { gjennomsnittsPris, priser, historiskSnittPris } = useDagensPriserStore();

  const dagligKWh = beregnTotalKWh(stroemForbruk);
  const eksaktDagsPris = beregnEksaktDagsPris(stroemForbruk, priser.data);
  const ukePris = eksaktDagsPris * 7;
  const månedPris = eksaktDagsPris * 30;
  const årPrisPrKWh = historiskSnittPris ?? gjennomsnittsPris;
  const årPris = dagligKWh * årPrisPrKWh * 365;

  return (
    <KontrollWrapper>
      <KotrollTittel>{mittHus.navn}</KotrollTittel>
      <InnerWrapper>
        <ul>
          <li>Dagens forbruk er {dagligKWh.toFixed(2)} kWh</li>
          <li>
            Dagens snittpris er{" "}
            <strong>
              {gjennomsnittsPris ? gjennomsnittsPris.toFixed(2) : "0.00"} kr per
              kWt
            </strong>
          </li>
          <li>
            Det gir en pris på ca {eksaktDagsPris.toFixed(2)} kroner
          </li>
          <ListItemFirst>Det blir ca {ukePris.toFixed(2)} kr pr uke</ListItemFirst>
          <li>Det blir ca {månedPris.toFixed(2)} kr pr måned</li>
          <li>
            Det blir ca {årPris.toFixed(0)} kr pr år{" "}
            <small>({historiskSnittPris ? "snitt siste 12 mnd" : "basert på dagspris"})</small>
          </li>
        </ul>
      </InnerWrapper>
      <PrisLegende>
        <small>Priser hentet fra hvakosterstrommen.no. Årsestimat basert på historiske månedspriser (siste 12 mnd).</small>
      </PrisLegende>
    </KontrollWrapper>
  );
};

const KontrollWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  grid-area: kontroll;
  background: ${COLORS.clr_lightorange};
  border-radius: 0 40px 0 40px;
  padding: 0 2rem;
`;
const InnerWrapper = styled.div`
  display: flex;
  height: 100%;
  /* flex-direction: column; */
  /* justify-content: space-between; */
`;
const ListItemFirst = styled.li`
  margin-top: 1.2rem;
`;
const PrisLegende = styled.div`
  text-align: right;
  /* padding-right: 2rem; */
  line-height: ${SIZES.medium_spacer}px;
  /* background: ${COLORS.clr_mediumdarkred}; */
  min-height: ${SIZES.medium_spacer}px;
`;
const KotrollTittel = styled.h2`
  margin: 1.2rem 0;
  color: ${COLORS.clr_mediumdarkred};
  /* text-align: center; */
  line-height: ${SIZES.medium_spacer}px;
`;
const KotrollVerdi = styled.h3`
  justify-self: top;
  margin: 1.2rem 0;
  color: ${COLORS.clr_mediumdarkred};
  /* text-align: center; */
`;
export default TittelFelt;
