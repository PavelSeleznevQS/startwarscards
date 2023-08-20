import React, {FC, memo} from "react";
import {Button, Typography, Card as MuiCard, CardActions, CardContent, CardMedia} from '@mui/material';
import {styled} from '@mui/material/styles';
import {Person} from 'src/generatedAPI/models/person';

const PREFIX = 'Card';
const classes = {
  img: `${PREFIX}-img`,
  title: `${PREFIX}-title`,
  pos: `${PREFIX}-pos`,
}

const StyledCard = styled(MuiCard)({
  minWidth: 200,

  [`& .${classes.img}`]: {
    height: 'auto'
  },

  [`& .${classes.title}`]: {
    fontSize: 14
  },

  [`& .${classes.pos}`]: {
    marginBottom: 12
  },
})

interface IProps {
  person: Person & {id: string}
}

const Card: FC<IProps> = ({person}: IProps) => {
  return (
    <StyledCard variant="outlined">
      <CardMedia
        component="img"
        className={classes.img}
        alt={person.name}
        image={`https://starwars-visualguide.com/assets/img/characters/${person.id}.jpg`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {person.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="outlined" size="medium">
          Learn More
        </Button>
      </CardActions>
    </StyledCard>
  );
}

export default memo(Card);
