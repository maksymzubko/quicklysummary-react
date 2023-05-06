import CustomButton, {ButtonData} from "../index";

const LayoutButton = (data: ButtonData) => {
    return (
        <CustomButton
            {...data}
            onClick={data.onClick}
            args=
                {{
                    data_color: '#1A191D',
                    data_color_hover: 'white',
                    data_outline_hover: 'none',
                    data_outline: 'none',
                    data_background_color: 'linear-gradient(75deg, #A18CD1 9.18%, #FBC2EB 90.82%)',
                    data_background_color_hover: 'linear-gradient(90deg, rgba(26,25,29,1) 0%, rgba(26,25,29,1) 100%)'
                }}
        >{data.children}</CustomButton>
    );
};

export default LayoutButton;