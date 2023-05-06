import CustomButton, {ButtonData} from "../index";

const HeaderButton = (data: ButtonData) => {
    return (
        <CustomButton {...data} onClick={data.onClick}>{data.children}</CustomButton>
    );
};

export default HeaderButton;