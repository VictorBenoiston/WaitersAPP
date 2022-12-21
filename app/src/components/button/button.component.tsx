import { ActivityIndicator } from 'react-native';
import { Text } from '../Text';
import { Container } from './button.styles';

interface ButtonProps {
    children: string;
    onPress?: () => void;
    disabled?: boolean;
    loading?: boolean;
}

export const Button = ({ children, onPress, disabled, loading }: ButtonProps) => {
    return (
        <Container onPress={onPress} disabled={disabled || loading}>
            {loading ? (
                <ActivityIndicator color='#fff'/>
            )  : (
                <Text weight='600' color='#fff'>
                    {children}
                </Text>
            )}
        </Container>);
};

