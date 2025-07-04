import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES } from '../constants';
import { useTheme } from '../theme/ThemeProvider';
import Header from '../components/Header';
import { ScrollView } from 'react-native-virtualized-view';
import Button from '../components/Button';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const WhatsYourMood = () => {
    const navigation = useNavigation<NavigationProp<any>>();
    const { colors, dark } = useTheme();
    const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);

    const emojis = [
        '😊', '😂', '😍', '😎', '😇',
        '😡', '😤', '😞', '😠', '😭',
        '🤬', '🤒', '🥺', '👹', '🤩',
        '😰', '🤯', '🥰', '😠', '😛',
        '🤐'
    ];

    const renderEmojiItem = ({ item }: { item: string }) => (
        <TouchableOpacity
            style={[styles.emojiContainer, selectedEmoji === item && styles.selectedEmoji]}
            onPress={() => setSelectedEmoji(item)}
        >
            <Text style={styles.emojiText}>{item}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <Header title="" />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={[styles.title, {
                        color: dark ? COLORS.white : COLORS.greyscale900
                    }]}>What's Your Mood!</Text>
                    <Text style={[styles.subtitle, {
                        color: dark ? COLORS.grayscale200 : COLORS.grayscale700
                    }]}>about this order</Text>
                    <FlatList
                        data={emojis}
                        renderItem={renderEmojiItem}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={3}
                        contentContainerStyle={styles.flatListContainer}
                    />
                </ScrollView>
            </View>
            <View style={[styles.bottomContainer, {
                backgroundColor: dark ? COLORS.dark1 : COLORS.white,
            }]}>
                <Button
                    title="Cancel"
                    style={styles.cancelBtn}
                />
                <Button
                    title="Submit"
                    filled
                    style={styles.submitBtn}
                    onPress={() => navigation.navigate("ratethedriver")}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    area: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: 16
    },
    title: {
        fontSize: 22,
        fontFamily: "Urbanist Bold",
        color: COLORS.black,
        textAlign: "center"
    },
    subtitle: {
        fontSize: 16,
        fontFamily: "Urbanist Regular",
        color: COLORS.grayscale700,
        textAlign: "center",
        marginVertical: 12
    },
    flatListContainer: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    emojiContainer: {
        padding: 10,
        margin: 5,
        width: (SIZES.width - 64) / 3,
        height: (SIZES.width - 64) / 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emojiText: {
        fontSize: (SIZES.width - 64) / 4.6,
    },
    selectedEmoji: {
        borderColor: COLORS.primary,
        borderWidth: 2,
        borderRadius: 36
    },
    bottomContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        width: "100%",
        alignItems: "center",
        backgroundColor: COLORS.white,
        height: 112,
        borderTopLeftRadius: 36,
        borderTopRightRadius: 36
    },
    cancelBtn: {
        width: (SIZES.width - 48) / 2,
        backgroundColor: COLORS.tansparentPrimary,
        borderColor: COLORS.tansparentPrimary
    },
    submitBtn: {
        width: (SIZES.width - 48) / 2,
    }
});

export default WhatsYourMood;