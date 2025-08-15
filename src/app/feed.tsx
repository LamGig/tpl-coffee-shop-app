import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image'; // ✅ expo-image (cache + placeholder)
import { router } from 'expo-router'; // ✅ chỉ dùng link nội bộ
import React, { useMemo, useRef, useState } from 'react';
import {
    Dimensions,
    FlatList,
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
  productLink?: string; // link nội bộ trong app, ví dụ: '/details?id=abc' hoặc '/product/123'
}

const { height: SCREEN_H, width: SCREEN_W } = Dimensions.get('window');

// ✅ Tối ưu URL Unsplash: mặc định crop cho LIST; viewer sẽ tắt crop để giữ tỉ lệ gốc
const opt = (url: string, w = SCREEN_W, q = 70, crop = true) => {
  const sep = url.includes('?') ? '&' : '?';
  return `${url}${sep}auto=format${crop ? '&fit=crop' : ''}&w=${Math.round(w)}&q=${q}`;
};

// ✅ Placeholder rất nhỏ cho hiệu ứng hiện ảnh nhanh (blur nhẹ)
const thumb = (url: string) => {
  const sep = url.includes('?') ? '&' : '?';
  return `${url}${sep}auto=format&fit=crop&w=16&q=10`;
};

// Mock: CHỈ link nội bộ (bắt đầu bằng '/'), không có http/https
const mockData: FeedItem[] = [
  { id: '1',  image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93', likes: 120, comments: 8,  saves: 15,  description: 'Ly cappuccino nóng cho buổi sáng', productLink: '/details?id=cap-1' },
  { id: '2',  image: 'https://images.unsplash.com/photo-1510626176961-4b57d4fbad03', likes: 250, comments: 15, saves: 40,  description: 'Cold brew mát lạnh' },
  { id: '3',  image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187', likes: 500, comments: 32, saves: 80,  description: 'Latte art đầy sáng tạo', productLink: '/details?id=latte-3' },
  { id: '4',  image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93', likes: 75,  comments: 4,  saves: 10,  description: 'Cafe sữa đá chuẩn vị Việt' },
  { id: '5',  image: 'https://images.unsplash.com/photo-1510626176961-4b57d4fbad03', likes: 420, comments: 21, saves: 55,  description: 'Ly espresso đậm đà', productLink: '/details?id=esp-5' },
  { id: '6',  image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187', likes: 310, comments: 19, saves: 35,  description: 'Ngồi quán chill, nhâm nhi cafe' },
  { id: '7',  image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93', likes: 800, comments: 60, saves: 150, description: 'Sáng nay trời mưa, uống cà phê là nhất', productLink: '/details?id=rainy-7' },
  { id: '8',  image: 'https://images.unsplash.com/photo-1510626176961-4b57d4fbad03', likes: 200, comments: 10, saves: 25,  description: 'Cafe pha máy chuẩn barista' },
  { id: '9',  image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187', likes: 90,  comments: 3,  saves: 12,  description: 'Cappuccino và bánh ngọt', productLink: '/details?id=cap-9' },
  { id: '10', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93', likes: 650, comments: 45, saves: 100, description: 'Những khoảnh khắc cafe cùng bạn bè' },
];

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

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <PostCard item={item} index={index} openViewer={openViewer} />
        )}
        contentContainerStyle={styles.list}
        // ✅ Tuning cho list mượt hơn
        initialNumToRender={4}
        windowSize={5}
        maxToRenderPerBatch={5}
        removeClippedSubviews
      />

      {/* Viewer full màn hình kiểu TikTok (vuốt dọc để chuyển ảnh) */}
      <Modal visible={viewerOpen} animationType="fade" onRequestClose={() => setViewerOpen(false)}>
        <StatusBar barStyle="light-content" />
        <View style={styles.viewerRoot}>
          <TouchableOpacity style={styles.closeBtn} onPress={() => setViewerOpen(false)} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
            <Ionicons name="close" size={26} color="#fff" />
          </TouchableOpacity>

          <FlatList
            ref={pagerRef}
            data={data}
            keyExtractor={(item) => item.id}
            pagingEnabled
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.page}>
                <Image
                  // VIEWER: KHÔNG crop để giữ tỉ lệ gốc + letterbox đen
                  source={{ uri: opt(item.image, SCREEN_W, 75, false) }}
                  placeholder={{ uri: thumb(item.image) }}
                  contentFit="contain"   // ✅ không zoom/cắt
                  transition={150}
                  cachePolicy="memory-disk"
                  priority="high"
                  style={styles.pageImage}
                />

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
            // ✅ Tuning cho pager dọc
            windowSize={3}
            initialNumToRender={1}
            maxToRenderPerBatch={2}
            removeClippedSubviews
          />
        </View>
      </Modal>
    </View>
  );
}

/** ======= PostCard: 1 bài trên danh sách feed (có icon giỏ hàng scale theo ảnh) ======= */
function PostCard({
  item,
  index,
  openViewer,
}: {
  item: FeedItem;
  index: number;
  openViewer: (i: number) => void;
}) {
  const [imgW, setImgW] = useState(SCREEN_W); // đo bề rộng thực tế của ảnh
  const iconSize = Math.max(28, Math.round(imgW * 0.1)); // icon ≈ 10% bề rộng ảnh
  const offset = Math.max(8, Math.round(imgW * 0.025));  // lề ≈ 2.5%

  // Chỉ coi là "có link" khi productLink bắt đầu bằng '/'
  const hasLink = !!item.productLink && item.productLink.startsWith('/');

  const onCartPress = () => {
    if (!hasLink) return;
    router.push(item.productLink as any); // ✅ điều hướng nội bộ trong app
  };

  return (
    <View style={styles.post}>
      {/* Container relative để overlay cart bám theo ảnh */}
      <View
        style={styles.imageWrap}
        onLayout={(e) => setImgW(Math.max(1, Math.round(e.nativeEvent.layout.width)))}
      >
        {/* Ảnh LIST: crop để thumbnail đầy khung vuông */}
        <TouchableOpacity activeOpacity={0.85} onPress={() => openViewer(index)}>
          <Image
            source={{ uri: opt(item.image, SCREEN_W, 70, true) }}
            placeholder={{ uri: thumb(item.image) }}
            contentFit="cover"
            transition={200}
            cachePolicy="memory-disk"
            style={styles.image}
          />
        </TouchableOpacity>

        {/* ✅ Icon giỏ hàng: VÀNG nếu có link (clickable), TRẮNG nếu không có link (disabled) */}
        <TouchableOpacity
          activeOpacity={hasLink ? 0.9 : 1}
          onPress={onCartPress}
          disabled={!hasLink}
          style={[
            styles.cartBtn,
            {
              width: iconSize,
              height: iconSize,
              borderRadius: iconSize / 2,
              right: offset,
              bottom: offset,
              opacity: hasLink ? 1 : 0.7,
            },
          ]}
        >
          <Ionicons
            name="cart"
            size={Math.round(iconSize * 0.58)}
            color={hasLink ? '#FFC107' : '#FFFFFF'} // vàng khi có link, trắng khi không
          />
        </TouchableOpacity>
      </View>

      {/* Hành động dưới ảnh */}
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

      {/* Caption */}
      <Text style={styles.desc} numberOfLines={2}>
        {item.description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingVertical: 10,
    backgroundColor: '#000',
  },
  post: { marginBottom: 20 },

  /** ========= ẢNH TRONG LIST ========= */
  imageWrap: {
    position: 'relative', // để overlay cart định vị theo ảnh
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#222',
  },
  // ✅ Nút giỏ hàng overlay (scales theo ảnh)
  cartBtn: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.55)',
    // kích thước, borderRadius, right, bottom, opacity gán động theo ảnh
  },

  /** ========= HÀNH ĐỘNG & TEXT ========= */
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
  count: { marginLeft: 4, fontSize: 13, color: '#fff' },
  desc: { paddingHorizontal: 12, fontSize: 14, color: '#fff' },

  /** ========= VIEWER FULL MÀN HÌNH ========= */
  viewerRoot: { flex: 1, backgroundColor: '#000' },
  closeBtn: { position: 'absolute', top: 48, left: 16, zIndex: 10 },
  page: {
    width: SCREEN_W,
    height: SCREEN_H,
    backgroundColor: '#000',   // ✅ letterbox đen
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageImage: { width: SCREEN_W, height: SCREEN_H },
  overlayRight: { position: 'absolute', right: 14, bottom: 120, alignItems: 'center', gap: 18 },
  overlayBtn: { alignItems: 'center' },
  overlayCount: { color: '#fff', marginTop: 4, fontSize: 12 },
  overlayBottom: { position: 'absolute', left: 14, right: 14, bottom: 36 },
  caption: { color: '#fff', fontSize: 14 },
});
