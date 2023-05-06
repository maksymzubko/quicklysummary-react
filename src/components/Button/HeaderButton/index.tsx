import CustomButton, {ButtonData} from "../index";

const HeaderButton = (data: ButtonData) => {
    return (
        <CustomButton onClick={data.onClick}>{data.children}</CustomButton>
    );
};

export default HeaderButton;