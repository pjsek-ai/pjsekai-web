import React, { useState } from 'react';
import { useParams } from 'react-router';
import useSWR from 'swr';
import Paper from '@material-ui/core/Paper';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Fab from '@material-ui/core/Fab';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

import UnderConstruction from '../underConstruction';
import GachaCard from '../../components/GachaCard';
import Constants from '../../constants';

function GachaPage() {
  const { gachaId } = useParams();
  const { data } = useSWR(`${Constants.API_BASE_URL}database/master/gachas?id=${gachaId}`);
  // const { data: characterData } = useSWR(data && data.data[0] ? `${Constants.API_BASE_URL}database/master/gameCharacters?id=${data.data[0].characterId}` : null);
  // const { data: rarityData } = useSWR(data && data.data[0] ? `${Constants.API_BASE_URL}database/master/cardRarities?rarity=${data.data[0].rarity}` : null);
  // const supportUnitImageUrl = `/images/member/logo_${data && data.data[0].supportUnit}.png`;
  // const unitImageUrl = `/images/member/logo_${characterData && characterData.data[0].unit}.png`;

  return <div>
    {data ? <div><GachaCard gacha={data.data[0]} /><UnderConstruction /></div> : <div>Loading...</div>}


  </div>;
}

export default GachaPage;