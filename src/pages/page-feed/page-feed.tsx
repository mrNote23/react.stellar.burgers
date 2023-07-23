import { Fragment, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/store";
import { closeAllData, loadAllData } from "@store/reducers/feed-reducer";
import { FeedList } from "@pages/page-feed/feed-list/feed-list";
import { FeedInfo } from "@pages/page-feed/feed-info/feed-info";
import Error from "@components/error/error";
import styles from "./page-feed.module.css";

const PageFeed = () => {
  const dispatch = useAppDispatch();
  const feed = useAppSelector((store) => store.feed);

  useEffect(() => {
    if (!feed.connected) {
      dispatch(loadAllData());
    }
    return () => {
      dispatch(closeAllData());
    };
  }, [dispatch]);

  if (feed.message) {
    return <Error />;
  }
  return (
    <Fragment>
      <div className={styles.container}>
        <p className="text text_type_main-large w-100">Лента заказов</p>
        <div className={styles.blocks}>
          <section className={styles.left}>
            <FeedList orders={feed.orders} />
          </section>
          <section className={styles.right}>
            <FeedInfo feed={feed} />
          </section>
        </div>
      </div>
    </Fragment>
  );
};

export default PageFeed;
