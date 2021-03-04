import React from 'react';
import { useParams } from 'react-router';
import useSWR from 'swr';

import UnderConstruction from 'pages/underConstruction';
import GachaCardLarge from 'components/Gacha/Cards/Large';
import Constants from 'lib/constants';

function GachaPage() {
  const { gachaId } = useParams();
  const { data } = useSWR(`${Constants.API_BASE_URL}database/master/gachas?id=${gachaId}`);
  // const { data: characterData } = useSWR(data && data.data[0] ? `${Constants.API_BASE_URL}database/master/gameCharacters?id=${data.data[0].characterId}` : null);
  // const { data: rarityData } = useSWR(data && data.data[0] ? `${Constants.API_BASE_URL}database/master/cardRarities?rarity=${data.data[0].rarity}` : null);
  // const supportUnitImageUrl = `/images/member/logo_${data && data.data[0].supportUnit}.png`;
  // const unitImageUrl = `/images/member/logo_${characterData && characterData.data[0].unit}.png`;

  return <div>
    {data ? <div><GachaCardLarge gacha={data.data[0]} /><UnderConstruction /></div> : <div>Loading...</div>}


  </div>;
}

export default GachaPage;