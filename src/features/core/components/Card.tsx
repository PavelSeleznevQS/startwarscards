import React, {FC, memo} from "react";
import {Button, Typography, Card as MuiCard, CardActions, CardContent, CardMedia} from '@mui/material';
import {styled} from '@mui/material/styles';
import {Link} from 'react-router-dom';
import {IPerson} from 'src/features/person/services/PersonService';

const PREFIX = 'Card';
const classes = {
  img: `${PREFIX}-img`,
  title: `${PREFIX}-title`,
  pos: `${PREFIX}-pos`,
  link: `${PREFIX}-link`,
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

  [`& .${classes.link}`]: {

  },
})

interface IProps {
  person: IPerson
}

const Card: FC<IProps> = ({person}: IProps) => {
  return (
    <StyledCard variant="outlined">
      <CardMedia
        component="img"
        className={classes.img}
        alt={person.name}
        image={person.imgSrc}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {person.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Link className={classes.link} to={`/persons/${person.id}`}>
          <Button variant="outlined" size="medium">
            Learn More
          </Button>
        </Link>
      </CardActions>
    </StyledCard>
  );
}

export default memo(Card);
