import CustomButton, {ButtonData} from "../index";

const GoogleButton = (data: ButtonData) => {
    return (
        <CustomButton
            {...data}
            icon_data={data.icon_data}
            onClick={data.onClick}
            args=
                {{
                    data_color: '#1A191D',
                    data_color_hover: 'white',
                    data_outline_hover: 'none',
                    data_outline: '#1A191D',
                    data_background_color: 'white',
                    data_background_color_hover: '#1A191D'
                }}
        >
            {data.children}
        </CustomButton>
    );
};

export default GoogleButton;