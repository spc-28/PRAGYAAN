import Button from '@mui/material/Button';
interface Label{
    label: string;
    onClick?: ()=>void;
}
export default function Button1({label, onClick}: Label){
    return<Button onClick={onClick}sx={{width: '16.25rem',backgroundColor: '#000000','&:hover':{backgroundColor: '#ffffff',color: '#000000', border:'1px black solid'}}}variant="contained">{label}</Button>
}

// the button is taken from material ui and to apply our properties over it, we use "sx".