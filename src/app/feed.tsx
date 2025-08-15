import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useRef, useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    Modal,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface FeedItem {
  id: string;
  image: string;
  likes: number;
  comments: number;
  saves: number;
  description: string;
}

const mockData: FeedItem[] = [
  { id: '1',  image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93', likes: 120, comments: 8,  saves: 15,  description: 'Ly cappuccino nóng cho buổi sáng' },
  { id: '2',  image: 'https://images.unsplash.com/photo-1510626176961-4b57d4fbad03', likes: 250, comments: 15, saves: 40,  description: 'Cold brew mát lạnh' },
  { id: '3',  image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187', likes: 500, comments: 32, saves: 80,  description: 'Latte art đầy sáng tạo' },
  { id: '4',  image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93', likes: 75,  comments: 4,  saves: 10,  description: 'Cafe sữa đá chuẩn vị Việt' },
  { id: '5',  image: 'https://images.unsplash.com/photo-1510626176961-4b57d4fbad03', likes: 420, comments: 21, saves: 55,  description: 'Ly espresso đậm đà' },
  { id: '6',  image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187', likes: 310, comments: 19, saves: 35,  description: 'Ngồi quán chill, nhâm nhi cafe' },
  { id: '7',  image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93', likes: 800, comments: 60, saves: 150, description: 'Sáng nay trời mưa, uống cà phê là nhất' },
  { id: '8',  image: 'https://images.unsplash.com/photo-1510626176961-4b57d4fbad03', likes: 200, comments: 10, saves: 25,  description: 'Cafe pha máy chuẩn barista' },
  { id: '9',  image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187', likes: 90,  comments: 3,  saves: 12,  description: 'Cappuccino và bánh ngọt' },
  { id: '10', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93', likes: 650, comments: 45, saves: 100, description: 'Những khoảnh khắc cafe cùng bạn bè' },
];

const { height: SCREEN_H, width: SCREEN_W } = Dimensions.get('window');

export default function FeedScreen() {
  const data = useMemo(() => mockData, []);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const pagerRef = useRef<FlatList<FeedItem>>(null);

  const openViewer = (index: number) => {
    setStartIndex(index);
    setViewerOpen(true);
    requestAnimationFrame(() => {
      pagerRef.current?.scrollToIndex({ index, animated: false });
    });
  };

  const renderItem = ({ item, index }: { item: FeedItem; index: number }) => (
    <View style={styles.post}>
      <TouchableOpacity activeOpacity={0.85} onPress={() => openViewer(index)}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </TouchableOpacity>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="heart-outline" size={22} color="#fff" />
          <Text style={styles.count}>{item.likes}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="chatbubble-outline" size={22} color="#fff" />
          <Text style={styles.count}>{item.comments}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="bookmark-outline" size={22} color="#fff" />
          <Text style={styles.count}>{item.saves}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.desc} numberOfLines={2}>
        {item.description}
      </Text>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />

      {/* Viewer full màn hình kiểu TikTok (vuốt dọc để chuyển ảnh) */}
      <Modal visible={viewerOpen} animationType="fade" onRequestClose={() => setViewerOpen(false)}>
        <StatusBar barStyle="light-content" />
        <View style={styles.viewerRoot}>
          {/* Nút đóng */}
          <TouchableOpacity style={styles.closeBtn} onPress={() => setViewerOpen(false)} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
            <Ionicons name="close" size={26} color="#fff" />
          </TouchableOpacity>

          {/* Pager dọc */}
          <FlatList
            ref={pagerRef}
            data={data}
            keyExtractor={(item) => item.id}
            pagingEnabled
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.page}>
                <Image source={{ uri: item.image }} style={styles.pageImage} />

                {/* Overlay actions bên phải */}
                <View style={styles.overlayRight}>
                  <TouchableOpacity style={styles.overlayBtn}>
                    <Ionicons name="heart-outline" size={28} color="#fff" />
                    <Text style={styles.overlayCount}>{item.likes}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.overlayBtn}>
                    <Ionicons name="chatbubble-outline" size={28} color="#fff" />
                    <Text style={styles.overlayCount}>{item.comments}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.overlayBtn}>
                    <Ionicons name="bookmark-outline" size={28} color="#fff" />
                    <Text style={styles.overlayCount}>{item.saves}</Text>
                  </TouchableOpacity>
                </View>

                {/* Caption dưới cùng */}
                <View style={styles.overlayBottom}>
                  <Text style={styles.caption} numberOfLines={2}>
                    {item.description}
                  </Text>
                </View>
              </View>
            )}
            getItemLayout={(_, i) => ({ length: SCREEN_H, offset: SCREEN_H * i, index: i })}
            initialScrollIndex={startIndex}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingVertical: 10,
    backgroundColor: '#000', // nền đen
  },
  post: {
    marginBottom: 20,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#222',
  },
  actions: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 18,
  },
  count: {
    marginLeft: 4,
    fontSize: 13,
    color: '#fff',
  },
  desc: {
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#fff',
  },

  // ===== Viewer full màn hình =====
  viewerRoot: { flex: 1, backgroundColor: '#000' },
  closeBtn: { position: 'absolute', top: 48, left: 16, zIndex: 10 },
  page: {
    width: SCREEN_W,
    height: SCREEN_H,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageImage: {
    width: SCREEN_W,
    height: SCREEN_H,
    resizeMode: 'cover',
  },
  overlayRight: {
    position: 'absolute',
    right: 14,
    bottom: 120,
    alignItems: 'center',
    gap: 18,
  },
  overlayBtn: { alignItems: 'center' },
  overlayCount: { color: '#fff', marginTop: 4, fontSize: 12 },
  overlayBottom: {
    position: 'absolute',
    left: 14,
    right: 14,
    bottom: 36,
  },
  caption: { color: '#fff', fontSize: 14 },
});
