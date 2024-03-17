import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React, {useState, useEffect, memo} from 'react';
import Images from '../Constants/Images';
import {Colors} from '../Constants';

const Reaction = ({
  onPress,
  bgColor,
  like,
  index,
  activeDay,
  selectedActiveDay,
  parentItem,
  setReaction_id,
  type,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showReactionModal, setShowReactionModal] = useState(false);
  const [id, setId] = useState(0);
  const [selectedEmoji, setSelectedEmoji] = useState('#');
  const [isTypeLike, setIsTypeLike] = useState(false);

  useEffect(() => {
    if (type == 'like') {
      setIsTypeLike(true);
    }
  }, []);

  const handlePress = emjoi => {
    console.log('Emjoi::>>', emjoi);
    if (emjoi == 'happy') {
      setSelectedEmoji(Images.happyEmoji);
      setIsLiked(true);
      setShowReactionModal(false);
      onPress(3);
    }
    if (emjoi == 'sad') {
      setSelectedEmoji(Images.sadEmoji);
      setIsLiked(true);
      onPress(4);
      setShowReactionModal(false);
    }
    if (emjoi == 'angry') {
      setSelectedEmoji(Images.angryEmoji);
      setIsLiked(true);
      setShowReactionModal(false);
      onPress(6);
    }
    if (emjoi == 'confuse') {
      setSelectedEmoji(Images.confusedEmoji);
      setIsLiked(true);
      setShowReactionModal(false);
      onPress(7);
    }
    if (emjoi == 'light-angry') {
      setSelectedEmoji(Images.lightAngryEmoji);
      setIsLiked(true);
      setShowReactionModal(false);
      onPress(5);
    }
  };

  const onPressHandler = () => {
    if (activeDay == selectedActiveDay) {
      console.log('on Press Handler');
      setIsLiked(true);
      setSelectedEmoji(Images.like);
      console.log('Check Emoji::>>', selectedEmoji);
      onPress(1);
    } else {
      console.log('Non Active');
    }
  };

  const onPressEmojis = () => {
    if (like === 2) {
      setShowReactionModal(true);
    }
  };

  return (
    <View style={{height: showReactionModal ? 100 : 38}}>
      <TouchableOpacity
        activeOpacity={activeDay == selectedActiveDay ? 0.7 : 1}
        onPress={() => {
          if (like === 2) {
            activeDay == selectedActiveDay && !isTypeLike
              ? onPressEmojis()
              : onPressHandler();
          }
        }}
        style={[
          styles.container,
          {
            backgroundColor:
              (isLiked || like == 1) && isTypeLike
                ? bgColor
                : Colors.reactionBG,
          },
        ]}>
        {like == 2 ? (
          isLiked ? (
            <Image
              source={selectedEmoji}
              style={isLiked ? styles.image : styles.emoji}
            />
          ) : (
            <Image source={Images.dislike} style={styles.image} />
          )
        ) : (
          <Image
            source={
              like === 1
                ? Images.like
                : like == 3
                ? Images.happyEmoji
                : like == 4
                ? Images.sadEmoji
                : like == 5
                ? Images.lightAngryEmoji
                : like == 6
                ? Images.angryEmoji
                : like == 7
                ? Images.confusedEmoji
                : Images.dislike
            }
            style={like != 1 ? styles.emoji : styles.image}
          />
        )}
      </TouchableOpacity>

      {!isTypeLike && showReactionModal && (
        <View style={styles.topTip}>
          <Image source={Images.topTip} style={styles.topTipImage} />
        </View>
      )}

      {!isTypeLike && showReactionModal && (
        <View
          style={[
            styles.reactionPopUpModal,
            {
              left: index > 3 ? -165 : 0,
            },
          ]}>
          <TouchableOpacity
            style={styles.emojiContainer}
            onPress={() => handlePress('confuse')}>
            <Image source={Images.confusedEmoji} style={styles.emoji} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.emojiContainer}
            onPress={() => handlePress('light-angry')}>
            <Image source={Images.lightAngryEmoji} style={styles.emoji} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.emojiContainer}
            onPress={() => handlePress('sad')}>
            <Image source={Images.sadEmoji} style={styles.emoji} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.emojiContainer}
            onPress={() => handlePress('angry')}>
            <Image source={Images.angryEmoji} style={styles.emoji} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.emojiContainer]}
            onPress={() => handlePress('happy')}>
            <Image source={Images.happyEmoji} style={styles.emoji} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.reactionBG,
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  image: {width: 24, height: 24, resizeMode: 'contain'},

  emoji: {width: 33, height: 33, resizeMode: 'contain', marginHorizontal: 5},
  topTip: {position: 'absolute', top: 35, left: 10},
  topTipImage: {width: 24, height: 24, resizeMode: 'contain'},
  reactionPopUpModal: {
    borderWidth: 1,
    borderColor: Colors.greyBackground,
    position: 'absolute',
    flexDirection: 'row',
    zIndex: 100,
    paddingVertical: 2,
    marginHorizontal: -15,
    top: 50,
    borderRadius: 20,
  },
  emojiContainer: {zIndex: 10},
  emojiStyle: {width: 33, height: 33, resizeMode: 'contain'},
});

export default memo(Reaction);
