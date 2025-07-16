import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import DraggableCateWorker from "./components/DraggableCateWorker";
import { StrictModeDroppable } from "components/CustomDroppable/StrictModeDroppable";
import styles from "./styles.module.scss";
import classNames from "classnames";

interface IProps {
  categoriesArr?: any;
  loading?: boolean;
  setCategoriesArr?: any;
  onRefetch?: any;
  onDragEnd?: any;
}

const DraggableListCateWorker = ({
  categoriesArr,
  loading,
  setCategoriesArr,
  onRefetch,
  onDragEnd,
}: IProps) => {
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const startIndex = result.source.index;
    const endIndex = result.destination.index;
    const newCategoriesArr = [...categoriesArr];
    const [reorderCategory] = newCategoriesArr.splice(startIndex, 1);
    newCategoriesArr.splice(endIndex, 0, reorderCategory);
    if (startIndex !== endIndex) {
      setCategoriesArr(newCategoriesArr);
      onDragEnd({
        cateId: result?.draggableId,
        params: { order: endIndex + 1 },
      });
    }
  };

  return (
    <DragDropContext
      onDragEnd={handleDragEnd}
      autoScrollerOptions={{ disabled: true }}
    >
      <Droppable droppableId="categories">
        {(droppableProvider) => (
          <div
            className={styles.viewList}
            ref={droppableProvider.innerRef}
            {...droppableProvider.droppableProps}
          >
            <div className={styles.viewHeader}>
              <div
                className={classNames([styles.icon])}
                style={{ width: "5%" }}
              ></div>
              <div style={{ width: "30%" }}>カテゴリー名</div>
              <div style={{ width: "25%" }}>登録数</div>
              <div style={{ width: "25%" }}>更新日</div>
              <div style={{ width: "15%" }}></div>
            </div>
            {categoriesArr.map((item: any, index: any) => (
              <DraggableCateWorker
                id={item?.id}
                key={item?.index}
                index={index}
                data={item}
                onRefetch={onRefetch}
              />
            ))}
            {droppableProvider.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableListCateWorker;
