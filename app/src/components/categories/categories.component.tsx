import { FlatList } from 'react-native';

import { Text } from '../Text';
import { Category } from '../../types/Category';

import { CategoryContainer, Icon } from './categories.styles';
import { useState } from 'react';

interface CategoryProps {
    categories: Category[];
    onSelectCategory: (categoryId: string) => Promise<void>;
}


export const Categories = ({ categories, onSelectCategory }: CategoryProps) => {
    const [selectedCategory, setSelectedCategory] = useState('');

    function handleSelectCategory(categoryId: string) {
        const category = selectedCategory === categoryId ? '' : categoryId;
        setSelectedCategory(category);
        onSelectCategory(category);
    }

    return (

        <FlatList
            horizontal
            data={categories}
            contentContainerStyle={{ paddingRight: 24 }}
            keyExtractor={category => category._id}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item: category }) => {
                const isSelected = selectedCategory === category._id;
                return (
                    <CategoryContainer onPress={() => handleSelectCategory(category._id)}>
                        <Icon>
                            <Text opacity={isSelected ? 1 : 0.5}>{category.icon}</Text>
                        </Icon>

                        <Text size={14}
                            weight='600'
                            opacity={isSelected ? 1 : 0.5}>{category.name}</Text>
                    </CategoryContainer>);
            }
            }
        />
    );
};

