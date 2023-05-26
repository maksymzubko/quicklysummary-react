import CustomButton, {ButtonData} from "../index";

const HeaderButton = (data: ButtonData) => {
    return (
        <CustomButton {...data} onClick={data.onClick}>{data.children}</CustomButton>
    );
};

const HeaderMobileButton = (data: ButtonData) => {
    return (
        <CustomButton {...data}
                      icon_data={data.icon_data}
                      onClick={data.onClick}
                      args=
                          {{
                              ...data.args,
                              data_color: '#1A191D',
                              data_color_hover: 'white',
                              data_outline_hover: 'none',
                              data_outline: '#1A191D',
                              data_background_color: 'white',
                              data_background_color_hover: 'linear-gradient(75deg, #A18CD1 9.18%, #FBC2EB 90.82%)'
                          }}>{data.children}
        </CustomButton>
    );
};

export default HeaderButton;
export {HeaderMobileButton, HeaderButton};